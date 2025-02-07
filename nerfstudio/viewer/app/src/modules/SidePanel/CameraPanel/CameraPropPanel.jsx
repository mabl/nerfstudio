import { useControls, useStoreContext } from 'leva';
import { useDispatch, useSelector } from 'react-redux';

export default function CameraPropPanel(props) {
  const seconds = props.seconds;
  const set_seconds = props.set_seconds;
  const fps = props.fps;
  const set_fps = props.set_fps;

  const store = useStoreContext();

  const dispatch = useDispatch();

  // redux store state
  const render_height = useSelector(
    (state) => state.renderingState.render_height,
  );
  const render_width = useSelector(
    (state) => state.renderingState.render_width,
  );

  const setResolution = (value) => {
    dispatch({
      type: 'write',
      path: 'renderingState/render_width',
      data: value.width,
    });
    dispatch({
      type: 'write',
      path: 'renderingState/render_height',
      data: value.height,
    });
  };

  const [, setControls] = useControls(
    () => ({
      camera_resolution: {
        label: 'Resolution',
        value: { width: render_width, height: render_height },
        joystick: false,
        onChange: (v) => {
          setResolution(v);
        },
      },
      video_duration: {
        label: 'Duration (Sec)',
        value: seconds,
        min: 0.1,
        step: 0.1,
        onChange: (v) => {
          set_seconds(v);
        },
      },
      video_fps: {
        label: 'Framerate (FPS)',
        value: fps,
        min: 0.1,
        onChange: (v) => {
          set_fps(v);
        },
      },
    }),
    { store },
  );

  setControls({ video_fps: fps });
  setControls({ video_duration: seconds });
  setControls({
    camera_resolution: { width: render_width, height: render_height },
  });

  return null;
}
