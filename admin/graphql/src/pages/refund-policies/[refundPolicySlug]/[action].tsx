import Layout from '@/components/layouts/admin';
import CreateOrUpdateRefundPolicyForm from '@/components/refund-policy/refund-policy-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { Config } from '@/config';
import { useRefundPolicyQuery } from '@/graphql/refund-policies.graphql';
import { adminOnly } from '@/utils/auth-utils';
import { RefundPolicy } from '__generated__/__types__';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function UpdateRefundPolicyPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();

  const { data, loading, error } = useRefundPolicyQuery({
    variables: {
      slug: query.refundPolicySlug as string,
      language:
        query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
    },
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-update-refund-policy')}
        </h1>
      </div>
      <CreateOrUpdateRefundPolicyForm initialValues={data?.refundPolicy as RefundPolicy} />
    </>
  );
}
UpdateRefundPolicyPage.authenticate = {
  permissions: adminOnly,
};
UpdateRefundPolicyPage.Layout = Layout;

export const getServerSideProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['form', 'common'])),
  },
});
