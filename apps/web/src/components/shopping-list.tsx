import { useShoppingList } from '@/api/use-shopping-list.hook';
import { ShoppingItem } from '@/api/types';

export const ShoppingList = ({ menuPlanId }: { menuPlanId: number }) => {
  const { data, isLoading, error } = useShoppingList(menuPlanId);

  if (isLoading) {
    return <div>Loading .......</div>;
  }

  if (error) {
    return <div>Нет ингредиентов для закупа</div>;
  }

  return (
    <div>
      <div>Список закупок</div>
      {data.length > 0 ? (
        <ul>
          {data.map((item: ShoppingItem) => (
            <li key={item.name}>
              <span>{item.name}</span>&nbsp;-&nbsp;<span>{item.grams}&nbsp;грамм</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Нет ингредиентов для закупа</div>
      )}
    </div>
  );
};
