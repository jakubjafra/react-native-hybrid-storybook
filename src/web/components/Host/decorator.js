import React from 'react';
import Host from './Host';

const createHostDecorator = props => story => (
    <Host {...props}>
        {story()}
    </Host>
);

export default createHostDecorator;

export const fullScreenHostDecorator = createHostDecorator({ fullScreen: true });
export const inlineHostDecorator = createHostDecorator({ fullScreen: false });
