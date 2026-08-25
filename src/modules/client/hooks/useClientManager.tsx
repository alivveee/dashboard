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
  const { items, isLoading, add, update, remove } = useCrud<TItem>(
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

  const handleOpenAdd = () => {
    setSelectedItem(null);
    formOffcanvas.open();
  };

  const handleOpenEdit = (item: TItem) => {
    setSelectedItem(item);
    formOffcanvas.open();
  };

  const handleOpenDetail = (item: TItem) => {
    setSelectedItem(item);
    detailOffcanvas.open();
  };

  const handleCloseDetail = () => {
    detailOffcanvas.close();
    setSelectedItem(null);
  };

  const handleSubmitForm = async (data: Omit<TItem, "id">) => {
    if (selectedItem) {
      await update(selectedItem.id, data);
      showAlert(`${clientLabel} updated successfully.`);
    } else {
      await add(data);
      showAlert(`${clientLabel} added successfully.`);
    }

    handleCloseForm();
  };

  const handleCloseForm = () => {
    formOffcanvas.close();
    setSelectedItem(null);
  };

  const handleOpenDelete = (item: TItem) => {
    setSelectedItem(item);
    deleteModal.open();
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    await remove(selectedItem.id);
    handleCloseDelete();
  };

  const handleCloseDelete = () => {
    deleteModal.close();
    setSelectedItem(null);
  };

  const formInitialValues: Omit<TItem, "id"> = selectedItem
    ? toFormData(selectedItem)
    : emptyFormData;

  return {
    // Data
    items,
    isLoading,

    // Selected
    selectedItem,

    // Form
    formInitialValues,
    formOffcanvasRef: formOffcanvas.ref,
    handleOpenAdd,
    handleOpenEdit,
    handleSubmitForm,
    handleCloseForm,

    // Delete
    deleteModalRef: deleteModal.ref,
    handleOpenDelete,
    handleConfirmDelete,
    handleCloseDelete,

    // Detail
    detailOffcanvasRef: detailOffcanvas.ref,
    handleOpenDetail,
    handleCloseDetail,
  };
};

export default useClientManager;
