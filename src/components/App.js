import Library from './Library/Library'
import NowPlaying from './NowPlaying/NowPlaying';
import Player from './Player/Player'

function App() {
  return (
    <div className="bg-black" style={{height: "100%", width: "100%"}}>
      <Player></Player>
      <NowPlaying></NowPlaying>
      <Library></Library>
    </div>
  );
}

export default App;
