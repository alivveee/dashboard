import { useRef, useState } from "react";
import useCrud from "./useCrud";
import { createOffcanvasControls } from "../helpers/offcanvas";
import type { OffcanvasHandle } from "../components/Offcanvas";
import { createModalControls } from "../helpers/modal";
import type { ModalHandle } from "../components/Modal";
import { showAlert } from "../helpers/alert";

interface UseResourceManagerConfig<TItem extends { id: string }> {
  resourceLabel: string;
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

const useResourceManager = <TItem extends { id: string }>({
  resourceLabel,
  storageKey,
  initialItems,
  emptyFormData,
}: UseResourceManagerConfig<TItem>) => {
  // Hooks CRUD
  const { __items, __isLoading, __handleAdd, __handleUpdate, __handleRemove } =
    useCrud<TItem>(storageKey, initialItems);

  // Offcanvas
  const formOffcanvas = createOffcanvasControls(useRef<OffcanvasHandle>(null));
  const detailOffcanvas = createOffcanvasControls(
    useRef<OffcanvasHandle>(null),
  );

  // Modal
  const deleteModal = createModalControls(useRef<ModalHandle>(null));

  // Selected item
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const _handleOpenAdd = () => {
    setSelectedItem(null);
    formOffcanvas.open();
  };

  const _handleOpenEdit = (item: TItem) => {
    setSelectedItem(item);
    formOffcanvas.open();
  };

  const _handleOpenDetail = (item: TItem) => {
    setSelectedItem(item);
    detailOffcanvas.open();
  };

  const _handleCloseDetail = () => {
    detailOffcanvas.close();
    setSelectedItem(null);
  };

  const _handleSubmitForm = async (data: Omit<TItem, "id">) => {
    if (selectedItem) {
      await __handleUpdate(selectedItem.id, data);
      showAlert(`${resourceLabel} updated successfully.`);
    } else {
      await __handleAdd(data);
      showAlert(`${resourceLabel} added successfully.`);
    }

    _handleCloseForm();
  };

  const _handleCloseForm = () => {
    formOffcanvas.close();
    setSelectedItem(null);
  };

  const _handleOpenDelete = (item: TItem) => {
    setSelectedItem(item);
    deleteModal.open();
  };

  const _handleConfirmDelete = async () => {
    if (!selectedItem) return;

    await __handleRemove(selectedItem.id);
    _handleCloseDelete();
  };

  const _handleCloseDelete = () => {
    deleteModal.close();
    setSelectedItem(null);
  };

  const formInitialValues: Omit<TItem, "id"> = selectedItem
    ? toFormData(selectedItem)
    : emptyFormData;

  return {
    // Data
    __items,
    __isLoading,

    // Selected
    __selectedItem: selectedItem,

    // Form
    __formInitialValues: formInitialValues,
    __formOffcanvasRef: formOffcanvas.ref,
    __handleOpenAdd: _handleOpenAdd,
    __handleOpenEdit: _handleOpenEdit,
    __handleSubmitForm: _handleSubmitForm,
    __handleCloseForm: _handleCloseForm,

    // Delete
    __deleteModalRef: deleteModal.ref,
    __handleOpenDelete: _handleOpenDelete,
    __handleConfirmDelete: _handleConfirmDelete,
    __handleCloseDelete: _handleCloseDelete,

    // Detail
    __detailOffcanvasRef: detailOffcanvas.ref,
    __handleOpenDetail: _handleOpenDetail,
    __handleCloseDetail: _handleCloseDetail,
  };
};

export default useResourceManager;
