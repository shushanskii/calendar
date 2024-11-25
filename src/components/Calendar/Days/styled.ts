import styled, { css } from 'styled-components'

export const Day = styled.div<{
  $selected?: boolean,
  $disabled?: boolean,
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

    ${({ $selected }) => $selected && css`
        background: green;
    `}

    ${({ $disabled }) => $disabled && css`
        color: grey;
        pointer-events: none;
    `}
`
