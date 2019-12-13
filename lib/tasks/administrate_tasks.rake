desc "yarn_install"
namespace :administrate do
  namespace :webpacker do
    desc "Install deps with yarn"
    task :yarn_install do
      Dir.chdir(File.join(__dir__, "..", "..")) do
        has_integrity = system("yarn check --integrity", out: File::NULL)

        if !has_integrity
          system "yarn install --no-progress"
        end
      end
    end
  end
end


Rake::Task["webpacker:yarn_install"].enhance ["administrate:webpacker:yarn_install"]
