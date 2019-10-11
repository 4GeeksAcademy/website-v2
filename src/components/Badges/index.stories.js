import React from 'react';
import {storiesOf} from '@storybook/react';

import Badges from '.';

storiesOf('Badges', module)
    .add('Default', () => (
        <Badges />
    ));