import { assert } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { About } from '@/app/About/About';

describe('<About />', () => {

  test('AboutTest', () => {
    const component = shallow(<About/>);
    const copyrightText = component.find('.copyright').text();
    console.log(copyrightText);
    // assert.isTrue(copyrightText.includes('2019'));
  });
});