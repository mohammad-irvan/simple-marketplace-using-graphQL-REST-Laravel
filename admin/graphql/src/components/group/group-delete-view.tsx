import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteTypeMutation } from '@/graphql/type.graphql';
import { getErrorMessage } from '@/utils/form-error';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const GroupDeleteView = () => {
  const { t } = useTranslation();
  const [deleteTypeByID, { loading }] = useDeleteTypeMutation({
    //@ts-ignore
    update(cache, { data: { deleteType } }) {
      cache.modify({
        fields: {
          types(existingRefs, { readField }) {
            return existingRefs.filter(
              (ref: any) => deleteType.id !== readField('id', ref)
            );
          },
        },
      });
      toast.success(t('common:successfully-deleted'));
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    try {
      await deleteTypeByID({
        variables: { id: modalData as string },
      });
      closeModal();
      toast.success(t('common:successfully-deleted'));
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

export default GroupDeleteView;
