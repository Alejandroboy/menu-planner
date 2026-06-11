export function processingTypeHelper(processingTypeId: number) {
  switch (processingTypeId) {
    case 1:
      return 'Варка';
    case 2:
      return 'Жарка';
    case 3:
      return 'Запекание';
    case 4:
      return 'Нет обработки';
    default:
      return 'Добавьте способ обработки';
  }
}
