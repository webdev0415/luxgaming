import { Tournament} from '../Admin'

const Tournaments = ({tournaments}) => {
    return (
      <div className="col-span-2 bg-primary flex-col p-4 space-y-4 overflow-scroll ">
        <div className="space-y-2 overflow-scroll inline">
        {
            tournaments && tournaments.map((val, idx) => (
                <ChildTournaments key={idx} title={val["trnState"]} data={val["tournaments"]}/>
            ))
        }
        </div>
      </div>
    );
  };


  const ChildTournaments = ({title, data}) => {
      return (
          <div className="inline">
              <div className="text-white font-semibold text-sm mb-4 capitalize cursor-pointer">{title}</div>
              <div className=" overflow-scroll grid  gap-x-5 grid-flow-col">
                  {
                    data && data.map((value, idx) => (
                        <Tournament key={idx} trn={value}/>
                    ))
                  }
              </div>
        <img className="w-full py-2" src="/longlinebreaker.svg" />

          </div>
      )
  }

  export default Tournaments