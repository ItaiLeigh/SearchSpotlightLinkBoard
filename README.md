# SearchSpotlightLink
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


#### Disclaime:
The extension was built after submitting a feature-request to the Spotlight team.
The extension is in no way a replacement to the feature that in my humble opinion is needed as part of the website itself. A native feature would be a much better solution as it would be able to traverse the database itself rather than the shown briefs and the Board as this extension does, and it would be much faster and would take place most likely on server-side rather than client-side, keeping the website much more responsive.
I am calling the Spotlight team to replace the need of this extension by introducing a similar (and better) searchbar for performers on the Link Board webpages. From the javascript it looks like such a searchbar is in place in certain circumstances (I'm guessing for other user types but that's merely a guess) and it should not be a problem to include it for performers as well.