import { useState } from "react";
import useCrud from "../../../shared/hooks/useCrud";
import useModal from "../../../shared/hooks/useModal";
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

  // Modal
  const formModal = useModal();
  const deleteModal = useModal();
  const detailModal = useModal();

  // Selected item
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const openAdd = () => {
    setSelectedItem(null);
    formModal.open();
  };

  const openEdit = (item: TItem) => {
    setSelectedItem(item);
    formModal.open();
  };

  const openDetail = (item: TItem) => {
    setSelectedItem(item);
    detailModal.open();
  };

  const closeDetail = () => {
    detailModal.close();
    setSelectedItem(null);
  };

  const submitForm = async (data: Omit<TItem, "id">) => {
    if (selectedItem) {
      await update(selectedItem.id, data);
      showAlert(`${clientLabel} berhasil diperbarui.`);
    } else {
      await add(data);
      showAlert(`${clientLabel} berhasil ditambahkan.`);
    }

    closeForm();
  };

  const closeForm = () => {
    formModal.close();
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
    isFormOpen: formModal.isOpen,
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    // Delete
    isDeleteOpen: deleteModal.isOpen,
    openDelete,
    confirmDelete,
    closeDelete,

    // Detail
    isDetailOpen: detailModal.isOpen,
    openDetail,
    closeDetail,
  };
};

export default useClientManager;
