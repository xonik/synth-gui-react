import RoundButtonBase, { Props } from './RoundButtonBase';

class RoundLedPushButton8 extends RoundButtonBase {
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

export default RoundLedPushButton8