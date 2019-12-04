import React from 'react';
import {storiesOf} from '@storybook/react';

import GeeksVsOthers from '.';

storiesOf('GeeksVsOthers', module)
    .add('Default', () => (
        <GeeksVsOthers />
    ));