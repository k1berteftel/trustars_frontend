export let datas = [
    {
        key: 1,
        title: `Актуальность и высокий спрос`,
        description: `Боты по продаже Telegram Stars на данный момент самая востребованная и монетизируемая модель Telegram бота`
    },
    {
        key: 2,
        title: 'Полностью готовое решение',
        //description: 'тест'
        
        description: (
        <>
          Ты получаешь полностью готовый бот, который уже:
          <ul>
            <li key="1">Интегрирован с системой Telegram Stars</li>
            <li key="2">Имеет удобный интерфейс</li>
            <li key="3">Подключён к системе выплат</li>
          </ul>
        </>
        )
        
    },
    {
        key: 3,
        title: 'Полная техническая поддержка',
        description: `Мы не просто продаем бота - мы сопровождаем его на всех этапах.
        Ты занимаешься продвижением - мы берем на себя все техническое сопровождение`
    }
];


export let rates = [
  {
    key: 'standart',
    title: 'STANDART',
    old_price: 30,
    price: 15,
    points: [
      {key: 1, content: 'Аренда панели (ежемесячно)'},
      {key: 2, content: 'Тех. поддержка'},
      {key: 3, content: 'Еженедельные обновления'},
      {key: 4, content: 'Статус реселлера'},
      {key: 5, content: 'Ежемесячная оплата'},
      {key: 6, content: 'От 5000 заказов в месяц'}
    ]
  },
  {
    key: 'full',
    title: 'FULL',
    old_price: null,
    price: 30,
    points: [
      {key: 1, content: 'Аренда панели (ежемесячно)'},
      {key: 2, content: 'Тех. поддержка'},
      {key: 3, content: 'Еженедельные обновления'},
      {key: 4, content: 'Статус реселлера'},
      {key: 5, content: 'Ежемесячная оплата'},
      {key: 6, content: 'От 20000 заказов в месяц'},
      {key: 7, content: 'Личный менеджер'}
    ]
  }
];