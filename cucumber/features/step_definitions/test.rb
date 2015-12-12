Given(/^Open the homepage$/) do
  puts "Start testing!"
  visit("/")
  sleep 5
end

Given(/^Search "([^"]*)"$/) do | search_content |
  fill_in 'keyword' , with: search_content
  sleep 1
end

Given(/^Have (\d+) result$/) do | re |
  result = all('#bookmarksnum')
  number = result[0].text.to_i
  puts number
  expect(number).to eq re.to_i
end

Given(/^Have (\d+) pages of bookmarks$/) do | re |
  result = all('#pagenum')
  number = result[0].text.to_i
  puts number
  expect(number).to eq re.to_i
end

Given(/^Click Create a new bookmark button$/) do
  click_link 'modaltrigger'
end

Given(/^Enter new bookmark's name "([^"]*)"$/) do | content |
  fill_in 'createmark' , with: content
  sleep 1
end

Given(/^Enter the timestamp "([^"]*)"$/) do | content |
  fill_in 'createstamp' , with: content
  sleep 1
end

Given(/^Click created button$/) do
  click_button('createsubmit')
end

Given(/^Click Delete a bookmark button$/) do
  click_link 'modaltrigger2'
end

Given(/^Enter deleted bookmark's name "([^"]*)"$/) do | content |
  fill_in 'deletemark' , with: content
  sleep 1
end

Given(/^Click deleted button$/) do
  click_button('deletesubmit')
end
