require_relative "boot"

require "rails/all"
require "securerandom"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HrPortal
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    # config.before_configuration do
    #   env_file = File.join(Rails.root, 'config', 'local_env.yml')
    #   YAML.load(File.open(env_file)).each do |key, value|
    #     ENV[key.to_s] = value
    #   end if File.exists?(env_file)
    # end
    # encryption_key = SecureRandom.random_bytes(32)
    ENV['ENCRYPTION_KEY'] = "@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp"
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
 
end
