import React from 'react';
import {storiesOf} from '@storybook/react';

import WhoIsHiring from '.';

storiesOf('WhoIsHiring', module)
    .add('Default', () => (
        <WhoIsHiring />
    ));