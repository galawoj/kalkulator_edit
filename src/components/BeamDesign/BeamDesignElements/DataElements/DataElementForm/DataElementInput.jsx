import styles from '../DataElements.module.css'



const DataElementInput = (props) => {

    const dataInputChanger = (e) => {
        props.onSetDataElement((actualData) => {
            actualData[e.target.id] = e.target.value
            return { ...actualData }
        })
        console.log(props.dataElement)
    }


    return (
        <label className={styles.intersection}>
            {props.name}

            <div>
                {props.description}
                <input
                    id={props.id}
                    value={props.dataElement[props.id]}
                    onChange={dataInputChanger}
                    type="number"
                />
            </div>
        </label>
    )
}
export default DataElementInput
