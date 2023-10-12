import React from 'react';
// class在TS中才会有比较丰富的修饰词（结论）
// class Car {
//   readonly price = '100w';
//   public name = '车';
//   static speed = '320';
//   private brand = '宝马';
//   protected createTime = '1930';

//   readonly place;
//   constructor() {
//     this.place = 'china';
//   }
//   protected run() {
//     console.log('在迅捷的运动...');
//   }
// }
// class AdvanceCar extends Car {
//   constructor(props) {
//     super();
//     this.run();
//     console.log(this, '查看this', this.place);
//   }
// }
// const mini = new AdvanceCar('test');
// console.log(mini);
// mini.place = 'word';

export default class Sea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div>456</div>
      </>
    );
  }
}
