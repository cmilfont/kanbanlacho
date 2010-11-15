# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_mc_javascript_01_session',
  :secret      => '61065a0e4854baad0576f6886753767bb2ac439eb09358027bf688e4f400731e3b83f3529132ad56d4cf74e9f5fe7bfda788c914124703c2b4feba9d46666e36'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
