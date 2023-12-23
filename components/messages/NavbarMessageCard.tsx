interface NavbarMessageCardProps {
  title: string;
  messages: string[];
}

const NavbarMessageCard = ({ title , messages }: NavbarMessageCardProps) => {
  return (
    <div className="pt-5">
      <h3 className="text-light400_light500 text-right">
        {title}
      </h3>
      <ul className="text-right">
         {messages.map((message, index) =>
            <li
              key={index}
              className="small-semibold p-3 text-white"
              >
                {message}
             </li>
          )}
      </ul>
    </div>
  )
}

export default NavbarMessageCard
