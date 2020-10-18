import RoundButtonBase, { Props } from './RoundButtonBase';

class RoundPushButton8 extends RoundButtonBase {
  constructor(props: Props) {
    super(
      props,
      {
        buttonRadius: 4,
        buttonMode: 'push',
        ledButton: true
      }
    );
  }
}

export default RoundPushButton8