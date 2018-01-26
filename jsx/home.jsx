import React from 'react';
import ReactDOM from 'react-dom';
import Episodes from './episodes';
import episodes from '../content/episodes.json';
import createUrl from '../lib/create-url';

const NUM_EPISODES_PER_PAGE = 5;

const App = React.createClass({
  getInitialState() {
    return {
      currentEpisodes: episodes.slice(0, NUM_EPISODES_PER_PAGE),
      episodeList: episodes,
      startValue: 0,
      listNum: NUM_EPISODES_PER_PAGE,
      numOnPage: NUM_EPISODES_PER_PAGE,
      showPrev: false,
      showNext: true
    };
  },
  componentDidMount() {

  },
  showPrevButton(show) {
    this.setState({showPrev: show});
  },
  showNextButton(show) {
    this.setState({showNext: show});
  },
  previousList() {
    if(this.state.startValue >= 0 && this.state.listNum >= NUM_EPISODES_PER_PAGE) {
      const prevStart = this.state.startValue - this.state.numOnPage;
      const prevEnd = this.state.listNum - NUM_EPISODES_PER_PAGE;
      this.setState({
        currentEpisodes: episodes.slice(prevStart, prevEnd),
        startValue: prevStart,
        listNum: this.state.listNum - NUM_EPISODES_PER_PAGE
      });
    }

    // show next button
    this.showNextButton(true);

    // hide previous button if its the first page in the list
    if (this.state.startValue <= NUM_EPISODES_PER_PAGE) {
      this.showPrevButton(false);
    }
  },
  nextList() {
    const nextStart = this.state.startValue + this.state.numOnPage;
    const nextEnd = nextStart + NUM_EPISODES_PER_PAGE;
    this.setState({
      currentEpisodes: episodes.slice(nextStart, nextEnd),
      startValue: nextStart,
      listNum: this.state.listNum + NUM_EPISODES_PER_PAGE
    });

    // show previous button
    this.showPrevButton(true);

    // hide next button if its the last page in the list
    if ((this.state.startValue + (this.state.numOnPage * 2)) >= this.state.episodeList.length) {
      this.showNextButton(false);
    }
  },
  render() {
    let prevButton;
    if(this.state.showPrev !== false) {
      prevButton = <a href="#" className="prev" onClick={ this.previousList }>Previous</a>;
    }

    let nextButton;
    if(this.state.showNext !== false) {
      nextButton = <a href="#" className="next" onClick={ this.nextList }>Next</a>;
    }

    return (
      <div>
        <ul>
          {this.state.currentEpisodes.map((ep, i) => {
            const url = createUrl('/episodes/' + ep.title);
            i++;
            return (
              <Episodes key={i} epNum={ep.episode} url={url} title={ep.title} date={ep.published} description={ep.description} />
            );
          })}
        </ul>
        <div className="paging container">
          {prevButton}
          {nextButton}
        </div>
      </div>
    );
  }
});

module.exports = App;

ReactDOM.render(<App />, target);
