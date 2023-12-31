import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteShippingClassMutation } from '@/graphql/shipping.graphql';
import { getErrorMessage } from '@/utils/form-error';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ShippingDeleteView = () => {
  const { t } = useTranslation();
  const [deleteShippingClass, { loading }] = useDeleteShippingClassMutation({
    //@ts-ignore
    update(cache, { data: { deleteShipping } }) {
      cache.modify({
        fields: {
          shippingClasses(existingShippingRefs, { readField }) {
            return existingShippingRefs.filter(
              (shippingRef: any) =>
                deleteShipping.id !== readField('id', shippingRef)
            );
          },
        },
      });
    },
    onCompleted: () => {
      toast.success(t('common:successfully-deleted'));
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    try {
      deleteShippingClass({
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

export default ShippingDeleteView;
