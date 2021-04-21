import React from "react"
import styled from "styled-components"
import YouTube from "react-youtube"
import PropTypes from "prop-types"
import GImage from "gatsby-image"
import {Devices} from '../Responsive'

const VideoWrapper = styled.section`
  position: relative;
  width: ${props => props.width || "640px"};
  height: ${props => props.height || "auto"};
  margin: auto;
  @media ${Devices.xxs}{

  }
  @media ${Devices.xs}{

  }
  @media  ${Devices.sm}{

  }
  @media  ${Devices.tablet}{
    width: ${props => props.width_tablet};
    height: ${props => props.height_tablet};
  }
  @media  ${Devices.md}{
    width: ${props => props.width_md};
    height: ${props => props.height_md};
  }
  @media  ${Devices.lg}{

  }
  @media  ${Devices.xl}{

  }
  @media  ${Devices.xxl}{

  }
`

const Iframe = styled(YouTube)`
  padding: 0;
`

const Thumbnail = styled.img`
  display: block;
  object-fit: cover;

`

const Image = styled.div`
  position: relative;
  margin: auto;
  height: ${props => props.height || "auto"};
  width: ${props => props.width || "100%"};
  // overflow: hidden;
  box-shadow: ${props => props.shadow};
  border-radius: ${props => props.borderRadius || "1.25rem"};
  @media ${Devices.xxs}{

  }
  @media ${Devices.xs}{

  }
  @media  ${Devices.sm}{

  }
  @media  ${Devices.tablet}{
    width: ${props => props.width_tablet};
    height: ${props => props.height_tablet};
  }
  @media  ${Devices.md}{
    width: ${props => props.width_md};
    height: ${props => props.height_md};
  }
  @media  ${Devices.lg}{

  }
  @media  ${Devices.xl}{

  }
  @media  ${Devices.xxl}{

  }
`

const Player = ({id, onPlay, onPause, onEnd, onError, onStateChange, onPlaybackRateChange,
  onPlaybackQualityChange, imageSize, playerVars, noCookies, style, className,
  thumb, left_tablet, right_tablet, ...rest}) => {

  const [showVideo, setShowVideo] = React.useState(false)

  const validImageSizes = [
    "default",
    "hqdefault",
    "mqdefault",
    "sddefault",
    "maxresdefault"
  ]

  const image = () => validImageSizes.includes(imageSize) ? imageSize : "default"

  return <VideoWrapper {...rest} style={style}>
    {showVideo ? (
      <Iframe
        videoId={id}
        id={`a-${id} do-not-delete-this-hack`}
        onReady={e => e.target.playVideo()}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        onError={onError}
        onStateChange={onStateChange}
        onPlaybackRateChange={onPlaybackRateChange}
        onPlaybackQualityChange={onPlaybackQualityChange}
        opts={{
          width: "100%",
          host: noCookies
            ? "https://www.youtube-nocookie.com"
            : "https://www.youtube.com",
          ...playerVars
        }}
      />
    ) : (
      <Image
        borderRadius="3px"
      >
        {id && <Play onClick={() => setShowVideo(true)} right_tablet={right_tablet} left_tablet={left_tablet} aria-label="Play Video" />}
        {thumb && thumb.childImageSharp ?
          <GImage
            className={className}
            onClick={() => setShowVideo(true)}
            fluid={thumb.childImageSharp.fluid}
            alt="Video"
          // style={{
          //   height: style.height || "100%",
          //   width: style.width || "100%"
          // }}
          />
          :
          <Thumbnail
            className={className}
            onClick={() => setShowVideo(true)}
            src={thumb.replace("/static", "") || `https://img.youtube.com/vi/${id}/${image()}.jpg`}
            alt="Video"
          // style={{
          //   height: style.height || "100%",
          //   width: style.width || "100%"
          // }}
          />
        }
      </Image>
    )}
  </VideoWrapper>
}

export default Player;

Player.defaultProps = {
  onPlay: () => { },
  onPause: () => { },
  onEnd: () => { },
  onError: () => { },
  onStateChange: () => { },
  onPlaybackRateChange: () => { },
  onPlaybackQualityChange: () => { },
  imageSize: "default",
  playerVars: {},
  noCookies: false,
  thumb: null,
  style: {}
}

Player.propTypes = {
  /** ID of the youtube video to play . */
  id: PropTypes.string.isRequired,
  /** .function to run when the video starts Playing */
  onPlay: PropTypes.func,
  /** .Function that runs when the video is paused */
  onPause: PropTypes.func,
  /** . Functinn that runs on the end of the video */
  onEnd: PropTypes.func,
  /** .Function that runs when the video encounters an error */
  onError: PropTypes.func,
  /** .Function that runs when the video changes state like from playing to paused */
  onStateChange: PropTypes.func,
  /** .Function that runs when the video encounters changes playback rater */
  onPlaybackRateChange: PropTypes.func,
  /** .Function that runs when the video changes quality */
  onPlaybackQualityChange: PropTypes.func,
  /** https://developers.google.com/youtube/player_parameters */
  playerVars: PropTypes.object,
  /** .Styles to apply over the wrappr */
  style: PropTypes.object,
  /** .if set to true will change the host to  "https://www.youtube-nocookie.com" */
  noCookies: PropTypes.bool,
  /** .Size of the thumbnail we get from youtube */
  imageSize: PropTypes.oneOf([
    "default",
    "hqdefault",
    "mqdefault",
    "sddefault",
    "maxresdefault"
  ])
}

const Play = styled.button`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  color: ${props => props.white};
  font-size: 1em;
  height: 44px;
  padding: 0;
  text-align: center;
  text-indent: 0.1em;
  transition: all 150ms ease-out;
  width: 44px;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: none;
  opacity: 0.8;
  cursor: pointer;
  z-index: 9;
  &:hover {
    background: black;
  }
  &:before {
    // background: inherit;
    border-radius: 5% / 50%;
    bottom: 9%;
    content: "";
    left: -5%;
    position: absolute;
    right: -5%;
    top: 9%;
  }
  &:after {
    border-style: solid;
    border-width: 1em 0 1em 1.732em;
    border-color: transparent transparent transparent rgba(255, 255, 255, 1);
    content: " ";
    font-size: 0.75em;
    height: 0;
    margin: -1em 0 0 -0.75em;
    top: 50%;
    position: absolute;
    width: 0;
  }
  @media ${Devices.xxs}{
  }
  @media ${Devices.xs}{
  }
  @media  ${Devices.sm}{
  }
  @media  ${Devices.tablet}{
    right: ${props => props.right_tablet};
    left: ${props => props.left_tablet};
  }
  @media  ${Devices.md}{
  }
  @media  ${Devices.lg}{
  }
  @media  ${Devices.xl}{
  }
  @media  ${Devices.xxl}{
  }
`