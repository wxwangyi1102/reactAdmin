import html from '../../../webview/day2/index.html'


export default function Sun() {
  return (
    <>
      <h1>一个标题</h1>
      <div>第二个标题</div>
      <iframe style={{}} width={'100%'} srcDoc={html} frameBorder='0' title="day1"></iframe>
    </>
  )
}
