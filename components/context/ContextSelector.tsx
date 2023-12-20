import React from 'react'
import ContextMessageCard from './ContextMessageCard'
import { contextMessageList } from '@/constants'

const ContextSelector = () => {
  return (
    <div className="flex w-full justify-start gap-5 pt-10">
        <div className="flex-center flex-1 gap-5">
            <div className="flex-center light-border flex-col  rounded-lg p-10 hover:bg-gray-100">
              <h3>نوع ویدثوی درخواستی خود را انتخاب  نمایید</h3>
              <div className="flex-between gap-10">
                  <video style={{ width: "100%", height: "auto" }} controls>
                     <source src={"./hint.mp4"} type='video/mp4' />
                      Your browser does not support the video tag.
                  </video>
                  <video style={{ width: "100%", height: "auto" }} controls>
                     <source src={"./hint.mp4"} type='video/mp4' />
                      Your browser does not support the video tag.
                  </video>
                  <video style={{ width: "100%", height: "auto" }} controls>
                     <source src={"./hint.mp4"} type='video/mp4' />
                      Your browser does not support the video tag.
                  </video>
              </div>
            </div>
        </div>
        <div className="flex flex-1 flex-col justify-start items-start gap-5">
            {contextMessageList.map(context => 
                <div
                    key={context.id}
                    className="light-border w-full rounded-lg px-5"
                    >
                      <ContextMessageCard 
                          id={context.id}
                          title={context.title}
                          messages={context.messages}
                        />
                </div>
             )}
        </div>
    </div>
  )
}

export default ContextSelector
