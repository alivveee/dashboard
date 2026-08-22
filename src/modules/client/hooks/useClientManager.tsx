import { useRef, useState } from "react";
import useCrud from "../../../shared/hooks/useCrud";
import { createOffcanvasControls } from "../../../shared/helpers/offcanvas";
import type { OffcanvasHandle } from "../../../shared/components/Offcanvas";
import { createModalControls } from "../../../shared/helpers/modal";
import type { ModalHandle } from "../../../shared/components/Modal";
import { showAlert } from "../../../shared/helpers/alert";

interface UseClientManagerConfig<TItem extends { id: string }> {
  clientLabel: string;
  storageKey: string;
  initialItems: TItem[];
  emptyFormData: Omit<TItem, "id">;
}

const toFormData = <TItem extends { id: string }>(
  item: TItem,
): Omit<TItem, "id"> => {
  const { id: _id, ...rest } = item;

  return rest;
};

const useClientManager = <TItem extends { id: string }>({
  clientLabel,
  storageKey,
  initialItems,
  emptyFormData,
}: UseClientManagerConfig<TItem>) => {
  // Hooks CRUD
  const { items, loading, add, update, remove } = useCrud<TItem>(
    storageKey,
    initialItems,
  );

  // Offcanvas
  const formOffcanvas = createOffcanvasControls(useRef<OffcanvasHandle>(null));
  const detailOffcanvas = createOffcanvasControls(useRef<OffcanvasHandle>(null));

  // Modal
  const deleteModal = createModalControls(useRef<ModalHandle>(null));

  // Selected item
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const openAdd = () => {
    setSelectedItem(null);
    formOffcanvas.open();
  };

  const openEdit = (item: TItem) => {
    setSelectedItem(item);
    formOffcanvas.open();
  };

  const openDetail = (item: TItem) => {
    setSelectedItem(item);
    detailOffcanvas.open();
  };

  const closeDetail = () => {
    detailOffcanvas.close();
    setSelectedItem(null);
  };

  const submitForm = async (data: Omit<TItem, "id">) => {
    if (selectedItem) {
      await update(selectedItem.id, data);
      showAlert(`${clientLabel} updated successfully.`);
    } else {
      await add(data);
      showAlert(`${clientLabel} added successfully.`);
    }

    closeForm();
  };

  const closeForm = () => {
    formOffcanvas.close();
    setSelectedItem(null);
  };

  const openDelete = (item: TItem) => {
    setSelectedItem(item);
    deleteModal.open();
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    await remove(selectedItem.id);
    closeDelete();
  };

  const closeDelete = () => {
    deleteModal.close();
    setSelectedItem(null);
  };

  const formInitialValues: Omit<TItem, "id"> = selectedItem
    ? toFormData(selectedItem)
    : emptyFormData;

  return {
    // Data
    items,
    loading,

    // Selected
    selectedItem,

    // Form
    formInitialValues,
    formOffcanvasRef: formOffcanvas.ref,
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    // Delete
    deleteModalRef: deleteModal.ref,
    openDelete,
    confirmDelete,
    closeDelete,

    // Detail
    detailOffcanvasRef: detailOffcanvas.ref,
    openDetail,
    closeDetail,
  };
};

export default useClientManager;
