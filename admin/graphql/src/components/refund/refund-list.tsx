import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { useTranslation } from 'next-i18next';
import TitleWithSort from '@/components/ui/title-with-sort';
import Pagination from '@/components/ui/pagination';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { SortOrder } from '__generated__/__types__';
import { useIsRTL } from '@/utils/locals';
import usePrice from '@/utils/use-price';
import { Routes } from '@/config/routes';
import { NoDataFound } from '@/components/icons/no-data-found';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

type IProps = {
  refunds: any;
  onPagination: (current: number) => void;
  refetch: Function;
};

const RefundList = ({ refunds, onPagination, refetch }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          sortedBy: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
          orderBy: value,
        });
      }, 500),
    [order]
  );

  const onHeaderClick = (value: string | undefined) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  const columns = [
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-id')}
          ascending={order === SortOrder.Asc && column === 'id'}
          isActive={column === 'id'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 120,
      onHeaderCell: () => onHeaderClick('id'),
      render: (id: number) => `#${t('table:table-item-id')}: ${id}`,
    },
    {
      title: t('common:text-reason'),
      dataIndex: 'refund_reason',
      key: 'refund_reason_name',
      align: alignLeft,
      ellipsis: true,
      width: 220,
      render: (record: any) => {
        return <span className="whitespace-nowrap">{record?.name}</span>;
      },
    },
    {
      title: t('table:table-item-customer-email'),
      dataIndex: 'customer',
      key: 'customer_email',
      align: 'center',
      width: 200,
      render: (customer: any) => (
        <span className="whitespace-nowrap">{customer?.email}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-amount')}
          ascending={order === SortOrder.Asc && column === 'amount'}
          isActive={column === 'amount'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 100,
      onHeaderCell: () => onHeaderClick('amount'),
      render: function Render(value: any) {
        const { price } = usePrice({
          amount: value ?? 0,
        });
        return <span>{price}</span>;
      },
    },
    {
      title: t('table:table-item-tracking-number'),
      dataIndex: 'order',
      key: 'tracking_number',
      align: 'center',
      width: 180,
      render: (_order: any) => (
        <span className="whitespace-nowrap">{_order?.tracking_number}</span>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table:table-item-created-at')}
          ascending={order === SortOrder.Asc && column === 'created_at'}
          isActive={column === 'created_at'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 140,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('created_at'),
      render: (active_date: string) => (
        <span className="whitespace-nowrap capitalize">
          {dayjs().to(dayjs.utc(active_date).tz(dayjs.tz.guess()))}
        </span>
      ),
    },
    {
      title: t('table:table-item-order-date'),
      dataIndex: 'order',
      key: 'order_created_at',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (_order: any) => (
        <span className="whitespace-nowrap capitalize">
          {dayjs().to(dayjs.utc(_order?.created_at).tz(dayjs.tz.guess()))}
        </span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-status')}
          ascending={order === SortOrder.Asc && column === 'status'}
          isActive={column === 'status'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      onHeaderCell: () => onHeaderClick('status'),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (id: string, refund: any) => {
        return (
          <ActionButtons
            id={id}
            detailsUrl={`${Routes.refund.list}/${id}`}
            customLocale={refund?.order?.language}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-8">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
          data={refunds?.data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>
      {!!refunds?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={refunds?.paginatorInfo.total}
            current={refunds?.paginatorInfo.currentPage}
            pageSize={refunds?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default RefundList;
