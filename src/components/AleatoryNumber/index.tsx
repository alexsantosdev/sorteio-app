import React, { useState } from 'react'
import Countdown from 'react-countdown-now'
import styled, { keyframes } from 'styled-components'
import ReactConfetti from 'react-confetti'

export default function AleatoryNumber() {
    const [raffled, setRaffled] = useState<number | null>(null)
    const [participants, setParticipants] = useState(Array.from({length:50}, (_, i) => i + 1))
    const [secondsRemainig, setSecondsRemainig] = useState(10)
    const [sorting, setSorting] = useState(false)

    const raffleWinner = () => {
        const drawn = participants[Math.floor(Math.random()  * participants.length)]
        setRaffled(drawn)
        setSorting(false)
    }

    const sortAgain = () => {
        setRaffled(null)
        setSorting(false)
    }

    return(
        <Container>
            <Header>
                <img src='/images/sorteio-logo.svg' alt='Sorteio logo' />
            </Header>
            <Content>
                {raffled ? (
                    <Winner>
                        <Confetti gravity={0.45} />
                        <span>O ganhador é:</span>
                        <Number>{raffled}</Number>
                        <RaffleButton onClick={sortAgain}>Sortear novamente</RaffleButton>
                    </Winner>
                ) : <></>}
                {!raffled && !sorting && participants.length > 0 ? (
                    <RaffleButton onClick={() => setSorting(true)}>Sortear ganhador</RaffleButton>
                ):<></>}
                {!raffled && sorting ? (
                    <div>
                        <Countdown
                            date={Date.now() + secondsRemainig * 1000}
                            onComplete={raffleWinner}
                            renderer={({ seconds }) => (
                                <RemainingTime>
                                  {seconds}
                                </RemainingTime>
                            )}
                        />
                    </div>
                ): <></>}
            </Content>
            <img style={{marginTop: '8rem'}} src='/images/sweet-logo.svg' alt='Sweet logo' />
        </Container>
    )
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const slideIn = keyframes`
    from {
        transform: translateY(100px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`

const zoomIn = keyframes`
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`
const Header = styled.div`
    animation: ${fadeIn} 1s;
`

const Content = styled.div`
    margin-top: 50px;
    animation: ${slideIn} 1s;
`

const Winner = styled.div`
    animation: ${fadeIn} 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    span {
        font-size: 24px;
        font-weight: bold;
    }
`

const Number = styled.h1`
    font-size: 82px;
    font-weight: bold;
    margin-bottom: ${zoomIn} 1s;
    color: #FF0099;
`

const RemainingTime = styled.span`
    font-size: 48px;
    font-weight: bold;
    color: #087891;
    margin-top: 50px;
    animation: ${zoomIn} 1s;
`

const Confetti = styled(ReactConfetti)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
`

const RaffleButton = styled.button`
    border: none;
    background: #FF0099;
    color: white;
    font-size: 24px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
    animation: ${fadeIn} 1s;
    &:hover {
        background-color: #E3078B;
    }
`