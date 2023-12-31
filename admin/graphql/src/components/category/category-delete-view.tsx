import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteCategoryMutation } from '@/graphql/categories.graphql';
import { getErrorMessage } from '@/utils/form-error';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const CategoryDeleteView = () => {
  const { t } = useTranslation();
  const [deleteCategoryById, { loading }] = useDeleteCategoryMutation({
    //@ts-ignore
    update(cache, { data: { deleteCategory } }) {
      cache.modify({
        fields: {
          categories(existingRefs, { readField }) {
            return existingRefs.data.filter(
              (ref: any) => deleteCategory.id !== readField('id', ref)
            );
          },
        },
      });
      toast.success(t('common:successfully-deleted'));
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    try {
      deleteCategoryById({
        variables: { id: modalData as string },
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default CategoryDeleteView;
