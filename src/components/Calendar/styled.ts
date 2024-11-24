import styled, { css } from 'styled-components'

const DATE_WIDTH = 50
const DATE_HEIGHT = 50

export const Container = styled.div`
    width: ${DATE_WIDTH * 7}px;
    height: ${DATE_HEIGHT * 5}px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`

export const Day = styled.div<{ $selected?: boolean, $disabled?: boolean }>`
    width: ${DATE_WIDTH}px;
    height: ${DATE_HEIGHT}px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid black;

    flex-grow: 0;
    flex-shrink: 0;

    cursor: pointer;

    ${({ $selected }) => $selected
            && css`
                background: green;
            `}

    ${({ $disabled }) => $disabled
            && css`
                color: grey;
                pointer-events: none;
            `}
`
