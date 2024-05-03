import React from 'react'
import { Container, Table } from 'reactstrap'
import styles from './display.module.css'

function Display() {
    let data: { key: string, cabinet: number, window: number }[] = [
        { "key": "П100", "cabinet": 110, "window": 1 },
        { "key": "K200", "cabinet": 115, "window": 1 },
        { "key": "П200", "cabinet": 110, "window": 2 }
    ];


    const queue = data.length > 0 ? data.map((d) => {
        return <tr key={d.key}>
            <td>{d.key}</td>
            <td>{d.cabinet}</td>
            <td>{d.window}</td>
        </tr>
    }) : <></>

    return (
        <Container>
            <Container>
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
        </Container>
    )
}

export default Display