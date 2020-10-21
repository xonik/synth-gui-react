import RoundButtonBase, { Props } from './RoundButtonBase';

class RoundRotaryButton17 extends RoundButtonBase {
  constructor(props: Props) {
    super(
      props,
      {
        buttonRadius: 8.5,
        buttonMode: 'rotate'
      }
    );
  }
}

export default RoundRotaryButton17