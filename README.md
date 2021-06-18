# Пока в разработке!!!

Представляем вам SDK для интеграции с [API CDEK v2.0](https://confluence.cdek.ru/pages/viewpage.action?pageId=29923741)

## Установка <a name="Установка"></a>

        npm i -save cdek-sdk

### Подключение <a name="Подключение"></a>

        const {cdek}= require('cdek-sdk');

## Возможности <a name="Возможности"></a>

- [x] [Авторизация клиентов](#Авторизацияклиентов)
    1. [Получение токена](#Получениетокена)
- [x] Заказы доставки
    1. Регистрация заказа
    1. Информация о заказе
    1. Изменение заказа
    1. Удаление заказа
    1. Регистрация отказа
- [ ] Заявки на вызов курьера
    1. Регистрация заявки на вызов курьера
    1. Информация о заявке
    1. Удаление заявки
- [ ] Квитанции и штрих-коды
    1. Формирование квитанции к заказу
    1. Получение квитанции к заказу
    1. Формирование ШК места к заказу
    1. Получение ШК места к заказу
- [ ] Договоренности о доставке
    1. Регистрация договоренности о доставке
    1. Информация о договоренности о доставке
    1. Информация о паспортных данных
    1. Информация о чеке
    1. Информация о переводе наложенного платежа
- [ ] Webhooks
    1. Подписка на вебхуки (Webhooks)
    1. Вебхуки (Webhooks)
- [x] Списки
    1. Список офисов
    1. Список регионов
    1. Список населенных пунктов
- [x] Калькуляторы
    1. Калькулятор. Расчет по коду тарифа
    1. Калькулятор. Расчет по доступным тарифам
    1. Калькулятор. Расчет таможенных пошлин при доставке в РФ

## Авторизация клиентов <a name="Авторизацияклиентов"></a>


### Получение токена <a name="Получениетокена"></a>


Для интеграции с ИС СДЭК по протоколу обмена данными (v2.0) необходимо:
1. Заключить договор со СДЭК
1. Ознакомиться с документацией и часто задаваемыми вопросами, представленными на сайте www.cdek.ru/clients/integrator.html
1. Осуществить реализацию, настройку и тестирование с помощью тестовый учетной записи:
<table>
  <thead>
    <tr>
      <th>Параметр</th>
      <th>Значение</th>
    </tr>
  </thead>
  <tr>
    <td>account</td>
    <td>EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI</td>
  </tr>
   <tr>
    <td>secure</td>
    <td>PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG</td>
  </tr>
</table>


>  <p><span>&#x26a0 </span> ИМ имеет возможность получать уведомления о результате отправки данных на электронную почту. Уведомления содержат информацию как об удачной загрузке заказов, так и об ошибках передачи данных. От данных уведомлений можно отписаться, но следует помнить, что все рассылки о проведении технических работ и изменениях в протоколе также высылаются на данный адрес. Все уведомления приходят с электронного адреса: noreply@cdek.ru в формате UTF-8. Для подключения уведомлений необходимо обратиться в службу технической поддержки integrator@cdek.ru с указанием вашего номера договора.</p>


>У тестовой учетной записи имеются следующие ограничения:
>    - заказы клиента, созданные под тестовой учетной записью, не отображаются в личном кабинете клиента на сайте www.lk.cdek.ru;
>    - тестовая учетная запись не имеет привязки к договору, следовательно, для нее не работают скидки и наценки, установленные в договоре;
>    - посылки для тестовых учетных записей не будут обрабатываться и доставляться.


4. После того как все проверено (протестировано, все вопросы решены), вам следует создать ключ для доступа к боевой учетной записи. Для этого нужно в личном кабинете в разделе "Интеграция" нажать кнопку "Создать ключ", затем в этом разделе появится идентификатор аккаунта и пароль.
1. Запустить решение в продакшн
