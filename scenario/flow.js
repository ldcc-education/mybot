const { setValue } = require('../modules/redis');
const message = require('./message');

module.exports = function (key, content, context) {

  function contextCheck (context) {
    const defaultContext = {
      index: 'reservation',
      name: null,
      phone: null,
      date: null,
      time: null,
      fortuneTeller: null,
      fortuneType: null
    };
    return context === null ? defaultContext : setContextBranch(context, content);
  };

  function setContext (context, msg) {
    context[context.index] = msg;
    return context;
  }

  function setContextBranch (context, msg) {
    return go(context,
      match
      .case({index: 'name'})(c => setContext(c, msg))
      .case({index: 'phone'})(c => setContext(c, msg))
      .case({index: 'date'})(c => setContext(c, msg))
      .case({index: 'time'})(c => setContext(c, msg))
      .case({index: 'fortuneTeller'})(c => setContext(c, msg))
      .case({index: 'fortuneType'})(c => setContext(c, msg))
      .else(c => c)
    );
  };

  function completeCheck (context) {
    return every(c => c, context)
  };

  function nextBranch (context, msg) {
    return go(context,
      match
      .case({index: 'reservation'})(c => reservationBranch(c, msg))
      .case({index: 'name'})(c => completeCheck(c) ? 'confirm' : 'phone')
      .case({index: 'phone'})(c => completeCheck(c) ? 'confirm' : 'date')
      .case({index: 'date'})(c => completeCheck(c) ? 'confirm' : 'time')
      .case({index: 'time'})(c => completeCheck(c) ? 'confirm' : 'fortuneTeller')
      .case({index: 'fortuneTeller'})(c => completeCheck(c) ? 'confirm' : 'fortuneType')
      .case({index: 'fortuneType'})(c => 'confirm')
      .case({index: 'confirm'})(_ => confirmBranch(msg))
      .case({index: 'check'})(c => 'reservation')
      .case({index: 'newReservation'})(_ => confirmNewReservationBranch(msg))
      .else(_ => 'reservation')
    )
  };

  function reservationHistoryCheck (context) {
    return completeCheck(context) ? true : false
  };

  function reservationBranch (context, msg) {
    switch (msg) {
      case '예약하기': return reservationHistoryCheck(context) ? 'newReservation' : 'name'; break;
      case '예약확인': return 'check'; break;
    }
  };

  function confirmNewReservationBranch (msg) {
    switch (msg) {
      case '예': return go(null, contextCheck, c => setValue(key, c), _ => 'name'); break;
      case '아니오': return 'reservation'; break;
    }
  };

  function confirmBranch (msg) {
    switch (msg) {
      case '예약 완료하기' : return 'check'; break;
      case '예약자명 변경하기': return 'name'; break;
      case '연락처 변경하기': return 'phone'; break;
      case '날짜 변경하기': return 'date'; break;
      case '시간 변경하기': return 'time'; break;
      case '선생님 변경하기': return 'fortuneTeller'; break;
      case '사주종류 변경하기': return 'fortuneType'; break;
    }
  };

  function updateRedis (context, index) {
    context.index = index;
    return setValue(key, context).then(_ => context);
  };

  function messageFunction (context, index) {
    return index === 'confirm' ? message.confirm(context) : message.check(context);
  }

  function nextMessage (context) {
    console.log(context);
    const { index } = context;
    return ['confirm', 'check'].includes(index) ? messageFunction(context, index) : message[index];
  };

  return go(
    context,
    contextCheck,
    c => setContextBranch(c, content),
    c => updateRedis(c, nextBranch(c, content)),
    c => nextMessage(c)
  );
};
