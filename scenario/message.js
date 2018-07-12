const moment = require('moment-timezone');
const dateRange = 7;

module.exports = {
  reservation: {
    message: {
      text: '[Example] 사주 카페 예약 챗봇'
    },
    photo: {
      url: 'http://press.changwon.ac.kr/news/photo/201711/3048432_1474_5633.jpg',
      width: 640,
      height: 240
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '예약하기',
        '예약확인'
      ]
    }
  },
  name: {
    message: {
      text: '예약자명을 입력해주세요.'
    }
  },
  updateName: {
    message: {
      text: '예약자명을 입력해주세요.'
    }
  },
  phone: {
    message: {
      text: '연락처를 입력해주세요.'
    }
  },
  updatePhone: {
    message: {
      text: '연락처를 입력해주세요.'
    }
  },
  date: (function () {
    const dateArr = [...Array(dateRange)];
    for (let i in dateArr) {
      dateArr[i] = moment().add('days', i).locale('ko').tz('Asia/Seoul').format(`MM월 DD일 dddd`);
    };
    return {
      message: {
        text: '예약 날짜를 선택해주세요.'
      },
      keyboard: {
        type: 'buttons',
        buttons: dateArr
      }
    };
  })(),
  time: {
    message: {
      text: '예약 시간을 선택해주세요.'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
      ]
    }
  },
  fortuneTeller: {
    message: {
      text: '예약하실 역술가 선생님을 선택해주세요.'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '선녀보살 진하윤 선생님',
        '백마장군 김필영 선생님',
        '아기동자 오동환 선생님',
        '중국장군보살 정은솔 선생님'
      ]
    }
  },
  fortuneType: {
    message: {
      text: '풀이할 사주종류를 선택해주세요.'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '사주학',
        '관상학',
        '손금',
        '작명',
        '타로점'
      ]
    }
  },
  confirm: function (data) {
    const { name, phone, date, time, fortuneTeller, fortuneType } = data
    return {
      message: {
        text: `
        예약자명: [${name}]
        연락처: [${phone}]
        날짜 : [${date}]
        시간 : [${time}]
        선생님 : [${fortuneTeller}]
        사주종류 : [${fortuneType}]
        위와 같이 예약하시겠습니까?
        `
      },
      keyboard: {
        types: 'buttons',
        buttons: [
          '예약 완료하기',
          '예약자명 변경하기',
          '연락처 변경하기',
          '날짜 변경하기',
          '시간 변경하기',
          '선생님 변경하기',
          '사주종류 변경하기'
        ]
      }
    }
  },
  check: function (data) {
    const { name, phone, date, time, fortuneTeller, fortuneType } = data
    return {
      message: {
        text: `
        예약 내역은 아래와 같습니다.
        예약자명: [${name}]
        연락처: [${phone}]
        날짜 : [${date}]
        시간 : [${time}]
        선생님 : [${fortuneTeller}]
        사주종류 : [${fortuneType}]
        `
      }
    }
  },
  newReservation: {
    message: {
      text: '기존 예약 내역이 있습니다. 기존 예약 내역을 지우고 새로 예약하시겠습니까?'
    },
    keyboard: {
      type: 'buttons',
      buttons: [
        '예',
        '아니오'
      ]
    }
  }
}
