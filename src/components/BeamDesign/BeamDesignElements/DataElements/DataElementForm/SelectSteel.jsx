import styles from '../DataElements.module.css'


const SelectSteel = (props) => {

    const dataInputChanger = (e) => {
        props.onSetDataElement((actualData) => {
            actualData[e.target.id] = e.target.value
            return { ...actualData }
        })
        console.log(props.dataElement)
    }


    return (
        <label className={styles.intersection}>
        Steel Grade
        <select onChange={dataInputChanger} value={props.dataElement['steelGrade']}  id={'steelGrade'}>
            <option value="AIIIN">AIIIN</option>
            <option value="B500W">B500W</option>
        </select>
    </label>
    )
}

export default SelectSteel