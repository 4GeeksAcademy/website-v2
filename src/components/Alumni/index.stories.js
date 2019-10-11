import React from 'react';
import {storiesOf} from '@storybook/react';

import Alumni from '.';

storiesOf('Alumni', module)
    .add('Default', () => (
        <Alumni />
    ));