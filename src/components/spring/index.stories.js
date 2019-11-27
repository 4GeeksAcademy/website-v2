import React from 'react';
import {storiesOf} from '@storybook/react';

import Spring from '.';

storiesOf('Spring', module)
    .add('Default', () => (
        <Spring />
    ));