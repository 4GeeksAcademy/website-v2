import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../components/Styling'
import {Device} from '../Responsive'
import {FadeIn} from '../Animations'

export const Card = styled.div`
    animation: 2s ${FadeIn} ease-out;
    z-index: ${props => props.index};
    flex-direction: column;
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    background: ${props => props.color === "black"
        ?
        `${Colors.black}`
        : props.color === "grey"
            ? `${Colors.lightGray}`
            : `${Colors.white}`
    };
    border-radius: ${props => props.borders};
    box-shadow: ${props => props.shadow
        && `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`
    }
    @media ${Device.xs}{
        height: ${props => props.h_xs};
        width: ${props => props.w_xs};
        
    }
    @media ${Device.sm}{
        width: 100%;
        height: ${props => props.h_sm};
        width: ${props => props.w_sm};
    }
    @media ${Device.md}{
        height: ${props => props.h_md};
        width: ${props => props.w_md};
           
    }
    @media ${Device.lg}{
        width: ${props => props.w_lg};
        height: ${props => props.h_lg};
    }
    @media ${Device.xl} {
        width: ${props => props.w_xl};
        height: ${props => props.h_xl};
    }
    ${props =>
        props.move === "up"
            ? css`
            @media ${Device.md}{
                transform: translateY(-${props.up});
                
            }
            @media ${Device.xs}{
                transform: translateY(0px);  
                margin: ${props => props.marginXs}
            }
            @media screen ${Device.sm}{  
                margin: ${props => props.marginSm}
            }
            @media ${Device.lg}{
                transform: translateY(-${props.up})
            }  
            }
            @media ${Device.xl} {
                transform: translateY(-${props.up})
            }`
            :
            props.move === "down"
            && css`
            @media ${Device.md}{
                transform: translateY(${props.down})
            }
            @media ${Device.xs}{    
            }
            @media screen ${Device.sm}{
            }
            @media ${Device.lg}{
                transform: translateY(${props.down})
            }    
            }
            @media ${Device.xl} {
                transform: translateY(${props.down})
            }`
    }
`;
Card.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    borders: PropTypes.string,
    shadow: PropTypes.bool,
    move: PropTypes.string,
    up: PropTypes.string,
    down: PropTypes.string,
}
Card.defaultProps = {
    borders: '1.25rem',
};