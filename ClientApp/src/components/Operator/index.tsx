import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Button from '../Button/index.tsx'
import NextImage from '../../public/Next.svg'
import styles from '../Display/display.module.css'

function Operator() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(10); // Время в секундах (2 минуты)
    let data: { key: string, serivce: string, status: string }[] = [
        { "key": "П100", "serivce": "Заполнение заявления в личном кабинете", "status": "Завершен" },
        { "key": "K200", "serivce": "Заполнение заявления в личном кабинете", "status": "Активен" },
        { "key": "П200", "serivce": "Заполнение заявления в личном кабинете", "status": "В ожидании" }
    ];

    const queue = data.length > 0 ? data.map((d) => {
        return <tr key={d.key}>
            <td>{d.key}</td>
            <td>{d.serivce}</td>
            <td className={d.status == "Завершен" ?
                styles.completed : d.status == "Активен" ?
                    styles.active : styles.waiting}>{d.status}</td>
        </tr>
    }) : <></>

    const textNext = () => {
        return <>
            <p>Следуюший</p>
            <img src={NextImage} width={40}></img>Б
        </>
    }

    // Функция для запуска таймера
    const startTimer = () => {
        setIsTimerActive(true);
        setRemainingTime(10); // Сброс времени на начальное значение
    };

    useEffect(() => {
        let timerInterval;

        // Если таймер активен и осталось время
        if (isTimerActive && remainingTime > 0) {
            // Уменьшаем время каждую секунду
            timerInterval = setTimeout(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            // Если время вышло или таймер неактивен, очищаем интервал
            clearInterval(timerInterval);
            setIsTimerActive(false);
        }

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(timerInterval);
    }, [isTimerActive, remainingTime]);

    return (
        <Container>
            <h1>Вы опреатор который работает с очередю:</h1>
            <ul>
                <li>очередь 1</li>
            </ul>
            <Container className='w-50 m-0 p-0'>
                <Button onClick={!isTimerActive ? startTimer : undefined} next>
                    {isTimerActive ? `Осталось времени: ${remainingTime} сек.` : `Следуюший`}
                    {!isTimerActive && <img src={NextImage} width={35} className='mx-2'></img>}
                </Button>
            </Container>
            <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>№ талона</th>
                            <th>Кабинет</th>
                            <th>Окно</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue}
                    </tbody>
                </table>
        </Container>
    )
}

export default Operator