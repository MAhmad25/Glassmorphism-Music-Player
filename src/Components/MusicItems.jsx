/* eslint-disable react/prop-types */
const MusicItems = ({ musicDetail }) => {
      return (
            <div className="w-full py-5 px-2 gap-5 flex items-center border-b-[.5px]">
                  <div className="w-10 h-10 overflow-hidden rounded-md">
                        <img className="w-full h-full object-cover" src={musicDetail.image} alt="" />
                  </div>
                  <h1 className="text-xl leading-none">{musicDetail.title}</h1>
            </div>
      );
};

export default MusicItems;