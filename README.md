# SearchSpotlightLinkBoard
A chrome extension to add a searchbar to the Spotlight's Link Board website for performers.
Spotlight is the UK standard casting website: www.spotlight.com

#### Features:
* Adds a searchbar to the pages of the Spotlight Link Board, when viewed as a performer, allowing a performen-user to search terms within the board. Note that the search is done directly on the board's briefs so searching for a term that is not included in the brief but exists only inside the full breakdown will no yield the corresponding result.
* Allows to select how many pages the extension should search (the range: page 1 - the selected value). Default value:5.
* Allows to select how spaces are interpreted (AND or OR). Searching for a term including spaces is possible by using double-quotes around it (example: "the term to search"). As a result, however, double quotes (") cannot be used as part of a term.

#### Caution!
Please note that this extension loads information it gets from Spotlight's server directly and shows it as the search results. This is a security hazard if working in an unsafe network, as you might get served altered results by a man-in-the-middle attack. Be careful when using the extension. (Note however that the extension does NOT execute the javascript of the loaded information. It merely displays it the same way it would have been displayed without having the extension).

#### Planned future development:
* Better design
   - design of the searchbar and accompanying fields and buttons
   - design of the shown results according to the even/odd table rows scheme used normally on Spotlight's Link Board
* Adding search capabilities
   - Allowing AND and OR logic to co-exist, employing logic operands and parentheses to better format the search terms
   - Adding an option to indicate the date to search back up to it rather than indicating the number of pages to search
   - Adding a selection between searching all the jobs, only those the performer has submitted to or only those s/he hasn't
