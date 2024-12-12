import styled, { css } from 'styled-components'

export const Day = styled.div<{
  $selected?: boolean,
  $disabled?: boolean,
  $selectedFirst?: boolean
  $selectedLast?: boolean
  $highlighted?: boolean
  width: number,
  height: number
}>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    flex-grow: 0;
    flex-shrink: 0;

    cursor: pointer;

    &:hover {
        color: red;
    }
    
    ${({ $selectedFirst }) => $selectedFirst && css`
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    `}

    ${({ $selectedLast }) => $selectedLast && css`
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    `}

    ${({ $highlighted}) => $highlighted && css`
        background: rgba(0,255,0, 0.5);
    `}
    
    ${({ $selected }) => $selected && css`
        background: green;
    `}

    ${({ $disabled }) => $disabled && css`
        color: grey;
    `}
`
