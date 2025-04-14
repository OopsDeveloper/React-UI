import { useEffect, useRef, useState } from 'react'
import cx from './cx'
import data from './data'

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string
  title: string
  description: string
  current: boolean
  toggle: () => void
}) => {
  const descRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (descRef.current) {
  //     descRef.current.addEventListener('beforematch', toggle)
  //   }
  //   return () => {
  //     if (descRef.current) descRef.current.removeEventListener('beforematch', toggle)
  //   }
  // }, [toggle])

  useEffect(() => {
    const el = descRef.current
    if (!el) return
  
    el.addEventListener('beforematch', toggle)
  
    // current 상태에 따라 hidden 속성 설정
    if (!current) {
      el.setAttribute('hidden', 'until-found')
    } else {
      el.removeAttribute('hidden')
    }
  
    return () => {
      el.removeEventListener('beforematch', toggle)
    }
  }, [current, toggle])

  return (
    <li className={cx('item', 'item3', { current })} key={id}>
      <div className={cx('tab')} onClick={toggle}>
        {title}
      </div>
      {/* <div className={cx('description')} ref={descRef} Hidden={current ? undefined : 'until-found'}> */}
      <div className={cx('description')} ref={descRef} >
        {description}
      </div>
    </li>
  )
}

const Accordion6 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id)
  const toggleItem = (id: string) => () => {
    setCurrentId(prev => (prev === id ? null : id))
  }

  return (
    <>
      <h3>
        #6. React<sub>ctrl+F 검색 가능</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((d, i) => (
          <AccordionItem {...d} key={d.id} current={currentId === d.id} toggle={toggleItem(d.id)} />
        ))}
      </ul>
    </>
  )
}

export default Accordion6

/* 참고: https://hiddenest.dev/accessible-accordion */
