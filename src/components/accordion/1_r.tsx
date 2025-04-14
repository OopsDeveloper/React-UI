import { useState } from "react";
import cx from "./cx"
import data from "./data"

const AccordionItem = ({ 
  id, 
  title, 
  description, 
  current, 
  toggle
}: { 
  id: string; 
  title: string; 
  description: string; 
  current: boolean; 
  toggle: () => void; 
}) => {
  return (
    <li className={cx('item', { current })} key={id}>
      <div className={cx('tab')} onClick={toggle}>{title}</div>
      {current && <div className={cx('description')}>{description}</div>}
    </li>
  )
}

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const toggleItem = (id: string) => () => {
    // prev === id : 이미 열린 걸 다시 클릭한 거니까 -> 닫아야 됨 -> null로 바꿈
    // prev !== id : 다른 걸 클릭했으니까 -> 그걸 새로 열어야 됨 -> id로 바꿈
    setCurrentId(prev => prev === id ? null : id);
  }

  return (
    <>
      <h3>#1. React <sub>현재 desc만 html로 그리기</sub></h3>
      <ul className={cx('container')}>
        {data.map(d => (
          <AccordionItem {...d} key={d.id} current={currentId === d.id} toggle={toggleItem(d.id)} />
        ))}
      </ul>
    </>
  )
}

export default Accordion1