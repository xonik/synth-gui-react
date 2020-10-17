import RoundButtonBase, { Props } from './RoundButtonBase';

class RoundRotaryButton10 extends RoundButtonBase {
  constructor(props: Props) {
    super(
      props,
      {
        buttonRadius: 5,
        buttonMode: 'rotate'
      }
    );
  }
}

export default RoundRotaryButton10