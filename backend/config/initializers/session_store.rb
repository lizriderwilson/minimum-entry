if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_minimum_entry", domain: "minimum-entry.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_minimum_entry"
end