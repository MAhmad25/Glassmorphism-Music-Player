import styled from "styled-components";

const Loader = () => {
      return (
            <StyledWrapper>
                  <div className="loader">
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                        <div className="l" />
                  </div>
            </StyledWrapper>
      );
};

const StyledWrapper = styled.div`
      .loader {
            display: flex;
            max-height: 20px;
      }

      .l,
      .l:nth-child(9) {
            margin: 0.15em;
            border-radius: 5em;
            width: 0.4em;
            background-color: rgba(250, 250, 250, 0.4);
            backdrop-filter: blur(10px);
            height: 2.5em;
            animation: load_5186 cubic-bezier(0.41, 0.44, 0.72, 0.69) 0.7s infinite;
      }

      .l:nth-child(2),
      .l:nth-child(8) {
            background-color: rgba(250, 250, 250, 0.4);
            backdrop-filter: blur(10px);
            animation-delay: 1s;
      }

      .l:nth-child(3),
      .l:nth-child(7) {
            background-color: rgba(250, 250, 250, 0.4);
            backdrop-filter: blur(10px);
            animation-delay: 0.75s;
      }

      .l:nth-child(4),
      .l:nth-child(6) {
            background-color: rgba(250, 250, 250, 0.4);
            backdrop-filter: blur(10px);
            animation-delay: 0.5s;
      }

      .l:nth-child(5) {
            background-color: rgba(250, 250, 250, 0.4);
            backdrop-filter: blur(10px);
            animation-delay: 0s;
      }

      @keyframes load_5186 {
            0% {
                  transform: scaleY(0.5);
            }

            100% {
                  transform: scaleY(-1);
            }
      }
`;

export default Loader;
